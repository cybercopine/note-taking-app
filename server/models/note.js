class Note {
    username = ""
    title = ""
    description = ""

    constructor(username, title, description) {
        this.username = username;
        this.title = title;
        this.description = description;
    }

    getJson() {
        let jsonObj = JSON.parse(JSON.stringify(this));
        delete jsonObj['username'];

        return jsonObj;
    }
}

exports.Note = Note;