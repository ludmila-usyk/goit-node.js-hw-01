const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

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
  const [contact] = contacts.filter((contact) => contact.id === contactId)
  return contact
}

async function removeContact(contactId) {
  const contacts = await readContent();
  const updatedContacts = contacts.filter(({ id }) => {
    return id.toString() !== contactId;
  });
  fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts;
}

const addContact = async (name, email, phone) => {
  const contacts = await readContent()
  const newContact = { name, email, phone, id: crypto.randomUUID() }
  contacts.push(newContact)
  await fs.writeFileSync(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }