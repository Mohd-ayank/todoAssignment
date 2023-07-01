window.$ = function() {
    this.selector = function(query) {
        let element = document.getElementById(query);
        return {
            html: f => {
                element.innerHTML = f;
                return this;
            },
            css: f => {
                element.style = f;
                return this;
            },
            click: f => {
                element.addEventListener("click", f);
                return this;
            }
        }
    }
}