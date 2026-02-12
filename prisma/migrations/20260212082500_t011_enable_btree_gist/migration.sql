-- T-011.2: PostgreSQL prerequisite for exclusion constraints on scalar + range columns.
-- Safe to re-run: IF NOT EXISTS makes this idempotent.
CREATE EXTENSION IF NOT EXISTS btree_gist;
