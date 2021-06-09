// code to build and initialize DB goes here

const {
  client,
  createLink,
  createTags,
  getAllLinks,
  getAllLinkTags,
  createLinkTag,
  updateClickCount
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    console.log("starting to drop tables")
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS link_images;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
     `)
     console.log("finished dropping tables")

     console.log("starting to create tables")
    await client.query(`
      CREATE TABLE links (
        ID SERIAL PRIMARY KEY,
        link_name varchar(255) NOT NULL,
        link_url varchar(255) UNIQUE NOT NULL,	
        link_image_id INT NULL,
        link_view_count INT NULL,
        link_comment varchar(255) NULL,
        creationDT DATE NOT NULL DEFAULT CURRENT_DATE
       );
      CREATE TABLE tags(
          ID SERIAL PRIMARY KEY,	
          tag_content varchar (255) UNIQUE NOT NULL	
      );
      CREATE TABLE link_images(
         ID SERIAL PRIMARY KEY,
          "linkId" INT REFERENCES links(ID) NOT NULL,	
          link_image_path BYTEA NULL
      );
      CREATE TABLE link_tags(
        "linkId" INT REFERENCES links(ID) NOT NULL,
        "tagId" INT REFERENCES tags(ID) NOT NULL,
        UNIQUE ("linkId", "tagId")
      )
    `)
    console.log("finished creating tables")
    // drop tables in correct order

    // build tables in correct order

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Starting to create links...")
    await createLink({ 
      link_name: 'Netflix', 
      link_url: 'https://www.netflix.com/',
      link_image_id: null,
      link_view_count: null,
      link_comment: 'Netflix is really overpriced these days' 
    });
    await createLink({ 
      link_name: 'Hulu', 
      link_url: 'https://www.hulu.com/welcome?orig_referrer=https%3A%2F%2Fwww.bing.com%2F',
      link_image_id: null,
      link_view_count: null,
      link_comment: 'Hulu has way better content then Netflix' 
    });
    await createLink({ 
      link_name: 'Reverb', 
      link_url: 'https://reverb.com/',
      link_image_id: null,
      link_view_count: null,
      link_comment: 'I have no idea what this is but Nick does' 
    });
    await createTags({
      tag_content: "TV/Movies"
    })
    await createTags({
      tag_content: "sports"
    })
    await createTags({
      tag_content: "Music"
    })
    await createLinkTag(1, 1)
    await getAllLinkTags()
    await updateClickCount(1, 10)
    await getAllLinks()
    console.log("finished creating links")
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());