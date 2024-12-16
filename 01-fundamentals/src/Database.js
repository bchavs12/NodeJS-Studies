import fs from 'node:fs/promises';

const dataBasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {}

  constructor() {
    fs.readFile(dataBasePath, 'utf8')
      .then(data => {
        // Após class Database ser iniciada sera lido, convertido e persistido no #database;
        // pois e um db de memoria e toda vez reiniciado reseta o banco
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        // Caso não exista arquivo db.json ele criara o mesmo vazio.
        this.#persist();
      })
  }

  #persist() {
    // Precisa do JSON.stringify pois arquivos não aceitam Json
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  select(table) {
    let data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      // se já existe um array adicione dado dentro deste array
      this.#database[table].push(data);
    } else {
      // se não criei o array e adicione esse dado la dentro
      console.log(this.#database)
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }
}