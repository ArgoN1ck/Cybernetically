CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user"(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_USERS" PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS "IDX_USER__USERNAME" ON "user"(username);

CREATE TABLE IF NOT EXISTS "counter"(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    count int NOT NULL DEFAULT 0,
    "userId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "deletedAt" timestamp DEFAULT NULL,
    CONSTRAINT "PK_COUNT" PRIMARY KEY (id),
    CONSTRAINT "FK_COUNT__USER_ID" FOREIGN KEY ("userId") REFERENCES "user" ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "IDX_count__USERID" ON "counter"("userId");

