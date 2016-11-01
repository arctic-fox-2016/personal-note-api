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
let User = mongoose.model('User', {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number
})

let UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID User'
        },
        name: {
            type: GraphQLString,
            description: 'name of user'
        },
        age: {
            type: GraphQLInt,
            description: 'age of user'
        }
    })
})
let getAll = () => {
    return new Promise((resolve, reject) => {
        User.find((err, users) => {
            if (err) {
                reject(err)
            } else {
                resolve(users)
            }
        })
    })
}
let QueryType = new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            users: {
                type: new GraphQLList(UserType),
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
        type: UserType,
        description: 'add a user',
        args: {
            name: {
                name: 'nama',
                description: 'Nama User',
                type: new GraphQLNonNull(GraphQLString)
            },
            age: {
                name: 'usia',
                description: 'Usia User',
                type: GraphQLInt
            }
        },
        resolve: (root, args) => {
            let newUser = new User({
                name: args.name,
                age: args.age
            })
            newUser.id = newUser._id
            return new Promise((resolve, reject) => {
                newUser.save(function(err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(newUser)
                    }
                })
            })
        }
    }
    ////////////////
    //muation findby Id
    /////////////////
let MutationFindbyId = {
    type: UserType,
    description: 'Find a user by id selector',
    args: {
        id: {
            name: 'user id',
            description: 'notes id to be searched',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findById(args.id, function(err, user) {
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
    type: UserType,
    description: 'Find a user with name and age keyword alike',
    args: {
        name: {
            name: 'nama',
            description: 'Nama User',
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            name: 'usia',
            description: 'Usia User',
            type: GraphQLInt
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                $and: [{
                    name: {
                        $regex: "^" + args.name
                    }
                }, {
                    age: args.age
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
//Mutation Schema Update
/////////////////

let MutationUpdate = {
    type: UserType,
    description: 'upadte user profile',
    args: {
        id: {
            name: 'id',
            description: 'id user',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'nama',
            description: 'nama user',
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            name: 'usia',
            description: 'usia user',
            type: new GraphQLNonNull(GraphQLInt)
        }

    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findById(args.id, (err, user) => {
                console.log(user);
                if (err) {
                    console.log(err)
                } else if (!user) {
                    reject('User NOT Found')
                } else {
                    user.name = args.name
                    user.age = args.age
                    user.save((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(user)
                        }
                    })
                }
            })
        })
    }
}

//////////////////
//Mutation Schema Delete
/////////////////

let MutationDelete = {
    type: UserType,
    description: 'delete a user',
    args: {
        id: {
            name: 'id',
            description: 'id user',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findById(args.id, (err, user) => {
                console.log(user);
                if (err) {
                    console.log(err)
                } else if (!user) {
                    reject('User NOT Found')
                } else {
                    user.remove((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(user)
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
