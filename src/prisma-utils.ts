class PropertyBuilder {
  private readonly obj: any = {};
  constructor (obj: object) {
    this.obj = obj;
  }

  without(...keys: string[]) {
    for (const key of keys) {
      if(key in this.obj) {
        this.obj[key] = false;
      }
    }

    return this;
  }

  with(...keys: string[]) {
    for (const key of keys) {
      if(key in this.obj) {
        this.obj[key] = true;
      }
    }

    return this;
  }

  build() {
    return this.obj;
  }
}

function withPropertiesFrom (obj: object | any) {
  if(typeof obj != "object" && typeof obj == "function")
    obj = new obj();
  const newObj: any = {};
  for (const key in obj) {
    newObj[key] = true;
  }
  return new PropertyBuilder(newObj);
}

function withoutPropertiesFrom (obj: object | any) {
  if(typeof obj != "object" && typeof obj == "function")
    obj = new obj();
  const newObj: any = {};
  for (const key in obj) {
    newObj[key] = true;
  }
  return new PropertyBuilder(newObj);
}

function allColumnExpect(cols: string[], ...keys: string[]) {
  for(const key of keys) {
    const index = cols.indexOf(key);
    if(index == -1) {
      throw new Error(`Property ${key} not found in object`); 
    }
    cols.splice(index, 1);
  }

  return cols.join(', ');
}

function allColumn(cols: string[]) {
  return cols.join(', ');
}

export { PropertyBuilder, withPropertiesFrom, withoutPropertiesFrom, allColumnExpect, allColumn };