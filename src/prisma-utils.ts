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

export { PropertyBuilder, withPropertiesFrom, withoutPropertiesFrom };