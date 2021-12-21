const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const randomuuid = require('randomuuid')
const contactsPath = path.join(__dirname, './db/contacts.json')

const readContent = async () => {
  const content = await fs.readFileSync(
    path.join(__dirname, 'db', 'contacts.json'),
    'utf8',
  )
  const result = JSON.parse(content)
  return result
}

const listContacts = async () => {
  return await readContent()
}

const getContactById = async (contactId) => {
  const contacts = await readContent()
  const contact = contacts.find((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const updatedContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFileSync(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(updatedContacts, null, 2),
  )
  return contacts.length !== updatedContacts.length
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = { listContacts, getContactById, removeContact, addContact }