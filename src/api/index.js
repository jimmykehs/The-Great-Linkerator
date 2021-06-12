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
    const {data} = await axios.get(`/api/tags`);
    console.log(data, "TAGS");
    return data;
  } catch (error) {
    throw error;
  }
}

//
export async function getLinksById(id) {
  try {
    const { data } = await axios.get(`/api/links${id}`);
    console.log(data, "LINK**ID");
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
<<<<<<< HEAD
    const { data } = await axios.delete(`/links/${id}`);
=======
    const { data } = await axios.delete(`api/links/${id}`);
>>>>>>> deeb2028352c86094e137dff8385384e4b1e5043
  } catch (error) {}
}
