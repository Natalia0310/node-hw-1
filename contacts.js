const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const getContact = await fs.readFile(contactsPath, "utf8");
  const contactsList = JSON.parse(getContact);
  return contactsList.find((el) => el.id === contactId);
}

async function removeContact(contactId) {
  const removeContact = await fs.readFile(contactsPath, "utf8");
  const contactsList = JSON.parse(removeContact);
  const filterContacts = contactsList.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const addContact = await fs.readFile(contactsPath, "utf8");
  const contactsList = JSON.parse(addContact);
  contactsList.push({ name, email, phone, id });
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
