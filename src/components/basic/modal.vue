<template>
    <div id="modal">
        <b-modal ref="modal" hide-footer lazy @hidden="hideModal" :title="title" centered>
            <component v-bind:is="cmp"></component>
        </b-modal>
    </div>
</template>

<script>
    export default {
        computed: {
            cmp () {
                let cmp = this.$store.state.modalCmp && this.$store.state.modalCmp.component ? this.$store.state.modalCmp.component : null;
                return cmp;
            },
            title () {
                let title = this.$store.state.modalCmp && this.$store.state.modalCmp.title ? this.$store.state.modalCmp.title : null;
                return title;
            }
        },
        methods: {
            hideModal () {
                this.$store.commit('toggleModal', null);
            }
        },
        watch: {
            cmp (val) {
                this.$refs.modal[val ? 'show' : 'hide']();
            }
        }
    }
</script>