/**
 * Side-effect module for the CLI scripts. Import it **before**
 * `../payload.config`, which reads `process.env` while it is being evaluated.
 *
 * Drizzle's dev schema push (`payload run` outside production) diffs the
 * schema against the database before the importing script's own code runs,
 * and blocks on an interactive prompt when it finds one. With no TTY — a
 * background run, CI, or a piped shell — that prompt never gets an answer and
 * the script hangs on "Pulling schema from database..." forever.
 *
 * None of these scripts change the schema; they only write rows and upload
 * files. Opting them out of the push is what keeps `npm run seed` and
 * `npm run seed:images` from hanging against a remote database. Schema changes
 * still reach the database through `next dev`, which is unaffected.
 */
process.env.PAYLOAD_DISABLE_SCHEMA_PUSH = 'true';
