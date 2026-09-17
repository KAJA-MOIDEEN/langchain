create extension if not exists vector with schema extensions;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1536)
);

create index if not exists documents_embedding_idx
  on public.documents
  using hnsw (embedding vector_cosine_ops);

create index if not exists documents_metadata_idx
  on public.documents using gin (metadata);
