export default /* gql */ `
mutation register($userData: UserRegisterInput!){
    register(userData: $userData) {
        id
        email
        token
    }
}`;
