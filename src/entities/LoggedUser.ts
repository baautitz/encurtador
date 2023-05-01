type LoggedUserProps = {
    token: string,
    username: string,
    name: string
}

let loggedUserList: LoggedUser[] = []

class LoggedUser {
    token: string
    username: string
    name: string
    lastReachDate: number

    constructor({ token, username, name }: LoggedUserProps) {
        this.token = token
        this.username = username
        this.name = name
        this.lastReachDate = new Date().getTime()
    }

    static addUser({ token, username, name }: LoggedUserProps): LoggedUser {
        const user = new LoggedUser({token, username, name});
        loggedUserList.push(user)
        return user;
    }

    static getUser(token: string): LoggedUser | undefined {
        const loggedUser: LoggedUser | undefined = loggedUserList.find(u => u.token == token)
        const index = loggedUserList.findIndex(u => u.token == token)

        if (!loggedUser) return undefined
        
        if ((new Date().getTime() - loggedUser.lastReachDate) > (100 * 60 * 60  * 24)) {
            this.removeUser(loggedUser.token)
            return undefined
        }
        
        loggedUserList[index].lastReachDate = new Date().getTime()  

        return loggedUser
    }

    static removeUser(token: string): boolean {
        const user: LoggedUser | undefined = loggedUserList.find(u => u.token == token)
        
        if (!user) return false

        loggedUserList = loggedUserList.filter(u => u.token != token)
        return true
    }

    static listUsers(): LoggedUser[] {
        return loggedUserList
    }
}

export default LoggedUser