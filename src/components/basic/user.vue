<template>
    <div>
        <a href="" @click.prevent="showModal"><i class="fa fa-user"></i>Личный кабинет</a>
    </div>
</template>
<script>

    export default {
        methods: {
            showModal () {
                this.$store.commit('toggleModal', {
                    'component': 'rt-login-form',
                    'title': 'Вход'
                });
            }
        }
    }
</script>

