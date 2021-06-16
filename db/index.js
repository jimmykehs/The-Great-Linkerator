// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkeratordb";
//change back to lowercase db
const DB_URL = process.env.DATABASE_URL || `https://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods
async function createLink({
  link_name,
  link_url,
  link_image_id,
  link_view_count = 0,
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
async function createTags(tag_content) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
    INSERT INTO tags(tag_content)
    VALUES ($1)
    RETURNING *;
    `,
      [tag_content]
    );
    return tag;
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

async function getAllTags() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM tags;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getTagByContent(tag_content) {
  const {
    rows: [tag],
  } = await client.query(`
  SELECT * FROM tags
  WHERE tag_content = '${tag_content}';
  `);

  return tag;
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

async function getAllLinksWithTags() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM links;
    `);

    return await attachTagsToLink(rows);
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
    const { rows } = await client.query(
      `
    UPDATE links
    SET link_view_count = $1
    WHERE ID = $2
    RETURNING *
    `,
      [++count, linkId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function attachTagsToLink(allLinks) {
  const linkIds = allLinks.map((link) => link.id);
  const inString = allLinks.map((_, index) => `$${index + 1}`).join(", ");

  const { rows: tags } = await client.query(
    `
    SELECT tags.tag_content, link_tags.*
    FROM tags
    JOIN link_tags ON tags.ID = link_tags."tagId"
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

// export
module.exports = {
  client,
  createLink,
  createTags,
  getAllLinks,
  getAllTags,
  getAllLinkTags,
  createLinkTag,
  updateClickCount,
  getAllLinksWithTags,
  attachTagsToLink,
  getTagByContent,
};
