<template>
    <span id="movieForm">
        <Button :to="{ name: 'movie', params: {movie: movie,isEdit: isEdit} }" type="primary" ghost  >{{ title }}</Button>
        <router-view></router-view>
    </span>
</template>

<script>
export default {
    props:['movie','isEdit'],
    computed:{
        title(){
            return this.isEdit ? 'Edit Movie' : '+ Add Movie'
        }
    },
}
</script>