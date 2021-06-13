import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks() {
  try {
    const { data } = await axios.get(`/api/links`);
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get(`/api/tags`);
    
    return data;
  } catch (error) {
    throw error;
  }
}

//
export async function getLinksById(id) {
  try {
    const { data } = await axios.get(`/api/links/:id`);
    
    return data;
  } catch (error) {
    throw error;
  }
}



export async function createLink({ url, comment, tags }) {
  try {
    const data = await axios.post(`/api/links/post`, {
      url: `${url}`,
      comment: `${comment}`,
      tags: `${tags}`,
    });
   
    return data;
  } catch (error) {
    throw error;
  }
}


