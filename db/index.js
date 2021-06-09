// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkeratorDB'
const DB_URL = process.env.DATABASE_URL || `https://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
<<<<<<< HEAD
client.connect()
=======
async function createLink({ 
  link_name,
  link_url,
  link_image_id,
  link_view_count,
  link_comment
}) {
  try {
    const { rows: [ link ] } = await client.query(`
      INSERT INTO links(link_name, link_url, link_image_id, link_view_count, link_comment) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (link_url) DO NOTHING 
      RETURNING *;
    `, [link_name, link_url, link_image_id, link_view_count, link_comment]);

    return link;
  } catch (error) {
    throw error;
  }
}
>>>>>>> main
// export
module.exports = {
  client,
  createLink
}