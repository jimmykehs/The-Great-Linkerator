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

export async function getLinksById(id) {
  try {
    const { data } = await axios.get(`/api/links/:id`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTagsById(id) {
  try {
    const { data } = await axios.get(`/api/tags/:id`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLink({ url, comment, tags = [] }) {
  try {
    const data = await axios.post(`/api/links`, {
      url: `${url}`,
      comment: `${comment}`,
      tags: `${tags}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateLink({ id, count }) {
  try {
    const data = await axios.patch(`/api/links/${id}`, {
      count,
    });
    return data;
  } catch (error) {
    throw error;
  }
}


export async function deleteLink(id) {
  try {
    const { data } = await axios.delete(`/api/links/${id}`)
    return data
  } catch (error) {
    throw error
  }
}
