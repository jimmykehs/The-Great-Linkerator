// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkeratordb";
const DB_URL = process.env.DATABASE_URL || `https://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods
async function createLink({
  link_name,
  link_url,
  link_image_id,
  link_view_count,
  link_comment,
}) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO links(link_name, link_url, link_image_id, link_view_count, link_comment) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (link_url) DO NOTHING 
      RETURNING *;
    `,
      [link_name, link_url, link_image_id, link_view_count, link_comment]
    );

    return link;
  } catch (error) {
    throw error;
  }
}


//createTags
async function createTags({ tag_content }) {
  try {
    const { rows } = await client.query(
      `
    INSERT INTO tags(tag_content)
    VALUES ($1)
    RETURNING *;
    `,
      [tag_content]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM links;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllLinkTags() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM link_tags;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllLinkTagsWithTags() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM links;
    `);

    return await attachTagstoLink(rows);
  } catch (error) {
    throw error;
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      `
    INSERT INTO link_tags("linkId", "tagId")
    VALUES ($1, $2)
    ON CONFLICT ("linkId", "tagId") DO NOTHING
    `,
      [linkId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function updateClickCount(linkId, count) {
  try {
    await client.query(
      `
    UPDATE links
    SET link_view_count = $1
    WHERE ID = $2
    `,
      [++count, linkId]
    );
  } catch (error) {
    throw error;
  }
}

async function attachTagstoLink(allLinks) {
  const linkIds = allLinks.map((link) => link.id);
  const inString = allLinks.map((_, index) => `$${index + 1}`).join(", ");

  const { rows: tags } = await client.query(
    `
    SELECT tags.*, link_tags.*
    FROM tags
    JOIN link_tags ON tags.ID = link_tags."linkId"
    WHERE link_tags."linkId" IN (${inString});
    `,
    linkIds
  );

  allLinks.forEach((link) => {
    link.tags = [];
    tags.forEach((tag) => {
      if (tag.linkId === link.id) {
        link.tags.push(tag);
      }
    });
  });

  return allLinks;
}
//function that joins links and tags and adds tags to said link

// export
module.exports = {
  client,
  createLink,
  createTags,
  getAllLinks,
  getAllLinkTags,
  createLinkTag,
  updateClickCount,
  attachTagstoLink,
  getAllLinkTagsWithTags,
};
