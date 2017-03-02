let controller = require('simple').cotroller;
module.exports = class media extends controller
{
    constructor()
    {
        super();
    }

    addMedia()
    {
        let mediaMod = this.pongomodel('media');
        
        mediaMod.savetogrid(this.postdata.data, this.postdata.filedata, (doc) => {
            var saveobj = { gridid: doc._id, profilethumb: this.postdata.profilethumb , user:this.postdata.user}
            if (doc._id !== undefined) {
                mediaMod.insert(saveobj, (res) => this.jsonResp(res));
            }
        });

    }
}