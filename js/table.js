
class TableBuilder {

    constructor(descriptor, containerId) {
        this.descriptor = descriptor;
        this.continerId = containerId;
    }

    layout() {
        return this.descriptor.layout;
    }

    data() {
        return this.descriptor.data;
    }

    header() {
        if (this.layout() != null) {
            let headerString = "<tr>";
            this.layout().forEach(column => {
                headerString += "<th class=\"" +
                this.classByAlign(column.alignment) +
                "\">" + column.title + "</th>";
            });
            return headerString + "</tr>";
        }
    }

    classByAlign(align) {
        switch (align) {
            case "center":
                return "align-center";
            case "right":
                return "align-right";
            default:
                return "align=left";
        }
    }
    
    tableRow(rowData) {
    }

    buildTable() {
    }
}