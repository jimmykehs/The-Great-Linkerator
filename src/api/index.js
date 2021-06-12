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
    console.log(data, "TAGS");
    return data;
  } catch (error) {
    throw error;
  }
}

//
export async function getLinksById(id) {
  try {
    const { data } = await axios.get(`/api/links/:id`);
    console.log(data, "LINK**ID");
    return data;
  } catch (error) {
    throw error;
  }
}


export async function createLink(url, comment, tags) {
  try {
    const data = await axios.post(`/api/links`, {
      url: url,
      comment: comment,
      tags: tags,
    });
    console.log(data, "data**")
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteLink(id) {
  try {
    const { data } = await axios.delete(`api/links/${id}`);
  } catch (error) {}
}
