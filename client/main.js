const baseURL = 'http://localhost:5000'

var app = new Vue({
    el: '#app',
    data: {
        isLoggin: false,
        position: 'login',
        email: '',
        password: '',
        jokes: [],
        joke: ''
    },
    methods: {
        login() {
            axios
                .post(baseURL + '/login', {
                    email: this.email,
                    password: this.password
                })
                .then(({ data }) => {
                    localStorage.setItem('access_token', data.access_token)
                    this.isLoggin = true
                    this.position = 'home'
                    this.email = ''
                    this.password = ''
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Login success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.fetchJoke()
                    this.getFavorites()
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.message,
                        type: 'error',
                    })
                })
        },
        fetchJoke() {
            axios
                .get('https://icanhazdadjoke.com/', {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(({ data }) => {
                    console.log(data)
                    this.joke = data.joke
                })
                .catch((err) => {
                    console.log(err)
                        .catch((err) => {
                            console.log(err)
                            Swal.fire({
                                title: err.message,
                                type: 'error',
                            })
                        })
                })
        },
        getFavorites() {
            this.jokes = []
            axios
                .get(baseURL + '/favorites', {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    console.log(data)
                    this.jokes = data
                    console.log(this.jokes)
                })
                .catch((err) => {
                    console.log(err)
                        .catch((err) => {
                            console.log(err)
                            Swal.fire({
                                title: err.message,
                                type: 'error',
                            })
                        })
                })
        },
        addFavorite() {
            axios
                .post(baseURL + '/favorites', {
                    joke: this.joke
                }, {
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                .then(({ data }) => {
                    this.jokes.push(data.joke)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Add success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getFavorites()
                    this.fetchJoke()
                })
                .catch((err) => {
                    console.log(err)
                        .catch((err) => {
                            console.log(err)
                            Swal.fire({
                                title: err.message,
                                type: 'error',
                            })
                        })
                })
        },
        deleteFavorite(id, index) {
            axios
                .delete(baseURL + `/favorites/${id}`, {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Remove success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.jokes.splice(index, 1)
                })
                .catch((err) => {
                    console.log(err)
                        .catch((err) => {
                            console.log(err)
                            Swal.fire({
                                title: err.message,
                                type: 'error',
                            })
                        })
                })
        },
        logout() {
            localStorage.clear()
            this.isLoggin = false
            this.position = 'login'

        }
    },
    mounted() {
        if (localStorage.getItem('access_token')) {
            this.isLoggin = true
            this.position = 'home'
            this.jokes = []
            axios
                .get(baseURL + '/favorites', {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    console.log(data)
                    this.jokes = data
                    console.log(this.jokes)
                })
                .catch((err) => {
                    console.log(err)
                        .catch((err) => {
                            console.log(err)
                            Swal.fire({
                                title: err.message,
                                type: 'error',
                            })
                        })
                })
        }
        else {
            this.isLoggin = false
            this.position = 'login'
        }
    },
    created() {
        axios
            .get('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(({ data }) => {
                console.log(data)
                this.joke = data.joke
            })
            .catch((err) => {
                console.log(err)
                    .catch((err) => {
                        console.log(err)
                        Swal.fire({
                            title: err.message,
                            type: 'error',
                        })
                    })
            })
    },
})