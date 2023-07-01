const $ = (selector, context = document) => {
    const elements = Array.from(context.querySelectorAll(selector));
    return {
        elements,
        html(newHtml) {
            this.elements.forEach(element => {
                element.innerHTML = newHtml;
            });
            return this;
        },
        css(newCss) {
            this.elements.forEach(element => {
                Object.assign(element.style, newCss);
            });
            return this;
        },
        on(event, handler, options) {
            this.elements.forEach(element => {
                element.addEventListener(event, handler, options);
            });
            return this;
        }
    };
};
