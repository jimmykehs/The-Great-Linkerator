// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkeratorDB'
const DB_URL = process.env.DATABASE_URL || `https://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
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


//createTags
async function createTags({tag_content}) {
  try {
    const { rows } = await client.query(`
    INSERT INTO tags(tag_content)
    VALUES ($1)
    RETURNING *;
    `, [tag_content])
    console.log(rows)
    return rows;
  } catch (error) {
    throw error
  }
}

async function getAllLinks() {
  try {
    console.log("Starting to get all links")
    const { rows } = await client.query(`
    SELECT *
    FROM links;
    `)
    return {rows}
  } catch (error) {
    throw error
  }
}

async function getAllLinkTags() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM link_tags;
    `)
    console.log(rows)
    return rows
  } catch (error) {
    throw error 
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(`
    INSERT INTO link_tags("linkId", "tagId")
    VALUES ($1, $2)
    ON CONFLICT ("linkId", "tagId") DO NOTHING
    `, [linkId, tagId])
  } catch (error) {
    throw error
  }
}

//async function updateClickCount

//function that joins links and tags and adds tags to said link

// export
module.exports = {
  client,
  createLink,
  createTags,
  getAllLinks,
  getAllLinkTags,
  createLinkTag
}