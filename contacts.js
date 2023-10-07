const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
const contacts = await listContacts();
  const contact = contacts.find(el => el.id === contactId);
  return contact || null;
}

// async function removeContact(contactId) {
//   const removeContact = await fs.readFile(contactsPath);
//   const contactsList = JSON.parse(removeContact);
//   const filterContacts = contactsList.filter((el) => el.id !== contactId);
//   await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
// }
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === JSON.stringify(contactId));
    const removedContact = contacts[index];
    if(index !== -1) {
        contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }    
    return removedContact ? removedContact : null;
}

// async function addContact(name, email, phone) {
//   const id = nanoid();
//   const addContact = await fs.readFile(contactsPath);
//   const contactsList = JSON.parse(addContact);
//   contactsList.push({ name, email, phone, id });
//   await fs.writeFile(contactsPath, JSON.stringify(contactsList));
// }


async function addContact(name, email, phone) {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    console.log(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
