import * as mongoose from 'mongoose'

const url = 'mongodb://oli-admin:oli-admin123@cluster0-shard-00-00-nwssh.mongodb.net:27017,cluster0-shard-00-01-nwssh.mongodb.net:27017,cluster0-shard-00-02-nwssh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

export const connect = () => {
    mongoose.connect(url)
}