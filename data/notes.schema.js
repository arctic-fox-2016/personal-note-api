import mongoose from 'mongoose'
import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} from 'graphql'
let Notes = mongoose.model('Notes', {
    id: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String
})

let NotesType = new GraphQLObjectType({
    name: 'notes',
    fields: () => ({
        userid: {
            type: GraphQLString,
            description: 'ID User'
        },
        title: {
            type: GraphQLString,
            description: 'title for users note'
        },
        content: {
            type: GraphQLInt,
            description: 'content of single note'
        }
    })
})
let getAll = () => {
    return new Promise((resolve, reject) => {
        Notes.find((err, notes) => {
            if (err) {
                reject(err)
            } else {
                resolve(notes)
            }
        })
    })
}
let QueryType = new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            notes: {
                type: new GraphQLList(NotesType),
                resolve: () => {
                    return getAll()
                }
            }
        })
    })
    //////////////////
    //Mutation Schema Add
    /////////////////
let MutationAdd = {
    type: NotesType,
    description: 'add new note',
    args: {
        userid: {
            name: 'userid',
            description: 'notes owner userid',
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            name: 'title',
            description: 'notes title',
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            name: 'content',
            description: 'notes content',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        let newNote = new Notes({
            userid: args.userid,
            title: args.title,
            content: args.content
        })
        newNote.id = newNote._id
        return new Promise((resolve, reject) => {
            newNote.save(function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(newNote)
                }
            })
        })
    }
}

//////////////////
//Mutation Schema Update
/////////////////

let MutationUpdate = {
        type: NotesType,
        description: 'update a note',
        args: {
            id: {
                name: 'noteid',
                description: 'notes id to be updated',
                type: new GraphQLNonNull(GraphQLString)
            },
            userid: {
                name: 'userid',
                description: 'notes owner userid to be updated',
                type: new GraphQLNonNull(GraphQLString)
            },
            title: {
                name: 'title',
                description: 'new notes title',
                type: new GraphQLNonNull(GraphQLString)
            },
            content: {
                name: 'content',
                description: 'new notes content',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, args) => {
            return new Promise((resolve, reject) => {
                User.findOne({
                    id: args.id
                }, (err, note) => {

                    if (err) {
                        console.log(err)
                    } else if (!note) {
                        reject('User NOT Found')
                    } else {
                        note.title = args.title
                        note.content = args.content
                        note.save((err) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(note)
                            }
                        })
                    }
                })
            })
        }
    }
    ////////////////
    //muation findby Id
    /////////////////
let MutationFindbyId = {
        type: NotesType,
        description: 'Find a single note by id selector',
        args: {
            id: {
                name: 'noteid',
                description: 'notes id to be searched',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, args) => {
            return new Promise((resolve, reject) => {
                Notes.findById(args.id, function(err, user) {
                    if (err) {
                        reject(err)
                    } else if (!user) {
                        console.log('user not found');
                    } else {
                        resolve(user)
                    }
                })
            })
        }
    }
    ////////////////
    //muation find
    /////////////////
let MutationFind = {
        type: NotesType,
        description: 'Find a note with title and content keyword alike',
        args: {
            title: {
                name: 'title',
                description: 'title note',
                type: new GraphQLNonNull(GraphQLString)
            },
            content: {
                name: 'content',
                description: 'any word in content alike ',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, args) => {
            return new Promise((resolve, reject) => {
                Notes.find({
                    $and: [{
                        content: {
                            $regex: "^" + args.content
                        }
                    }, {
                        title: {
                            $regex: "^" + args.title
                        }
                    }]
                }, function(err, user) {
                    if (err) {
                        reject(err)
                    } else if (!user) {
                        console.log('user not found');
                    } else {
                        resolve(user)
                    }
                })
            })
        }
    }
    //////////////////
    //Mutation Schema Delete
    /////////////////

let MutationDelete = {
    type: NotesType,
    description: 'delete a note',
    args: {
        id: {
            name: 'noteid',
            description: 'notes id to be deleted',
            type: new GraphQLNonNull(GraphQLString)
        },
        userid: {
            name: 'userid',
            description: 'notes owner userid tobe delete',
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            name: 'title',
            description: 'notes title to be deleted ',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                id: args.id
            }, (err, note) => {
                console.log(user);
                if (err) {
                    console.log(err)
                } else if (!note) {
                    reject('Note NOT Found')
                } else {
                    user.remove((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(note)
                        }
                    })
                }
            })
        })
    }
}

let MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: MutationAdd,
        insert: MutationAdd,
        find: Mutationfind,
        findById: MutationFindbyId,
        delete: MutationDelete,
        remove: MutationDelete,
        update: MutationUpdate,
        edit: MutationUpdate
    }
})

let schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
export default schema
