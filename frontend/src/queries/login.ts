export default /* gql */ `
query login($email: String!, $password: String!){
    login(email: $email, password: $password) {
        id
        email
        token
    }
}`;
