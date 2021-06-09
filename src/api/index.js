import axios from 'axios';


export async function getSomething() {
  try {
    const { data } = await axios.get( )
    return data
  } catch(error) {
    throw error
  }
}

export async function getLinks() {
  try {
    const { data } = await axios.get(`${ }/links`)
    console.log(data, 'LINKS')
    return data.links
  } catch(error) {
    throw error
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get(`${ }/tags`)
    console.log(data, 'TAGS')
    return data.tags
  } catch (error) {
    throw error
  }
}

export async function getLinksById(id) {
  try {
    const { data } = await axios.get(`${ }/links${id}`)
    console.log(data, 'LINK**ID')
  } catch (error) {
    throw error
  }
}

export async function createLink({ url, comment, tags = []}) {
  try {
    const { data } = await axios.post(`${ }/links`, {
      url: `${url}`,
      comment: `${comment}`,
      tags: `${tags}`,
    })
    return data
  } catch (error) {
    throw error
  }
}

export async function deleteLink(id) {
  try {
    const { data } = await axios.delete(`${ }/links/${id}`)
  } catch (error) {
    
  }
}