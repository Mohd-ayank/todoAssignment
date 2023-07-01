function Set() {
  this.items = [];
  this.add = item => {};
  this.addAll = items => {
    items.forEach(this.add);
  };
  this.remove = item => {};
  this.getItems = () => {
    return this.items;
  };
}