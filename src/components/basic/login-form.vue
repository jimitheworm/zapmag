<template>
    <div>
        <div v-if="!state">
        </div>
        <div v-else-if="state == 'NEW_PHONE'">
            <p>Телефона нет в нашей базе, повторите пароль, получите и вставьте sms код</p>
        </div>
        <div v-else-if="state == 'NEW_PASSWORD'">
            <p>Телефон есть в базе, но пароль неверный. Если хотите сменить пароль, получите sms код и придумайте новый пароль</p>
        </div>
        <div id="login-form">
        <b-form @submit="submitForm">
    <b-form-group
            id="fieldset-phone"
            label="Номер телефона"
            label-for="input-phone"
            description="Номер можно вводить в любом формате"
    >
        <b-form-input id="input-phone" v-model.trim="phone" autocomplete="off"></b-form-input>
    </b-form-group>

    <b-form-group
            id="fieldset-password"
            label="Пароль"
            label-for="input-password"
            description="Если вы новенький на сайте, придумайте новый"
    >
        <b-form-input id="input-password" type="password" v-model.trim="password" autocomplete="off"></b-form-input>
    </b-form-group>

            <template v-if="showPasswordConfirm">
                <b-form-group
                        id="fieldset-password"
                        label="Пароль еще раз"
                        label-for="input-password-confirm"
                >
                    <b-form-input id="input-password-confirm" type="password" v-model.trim="confirmPassword" autocomplete="off"></b-form-input>
                </b-form-group>
            </template>
            <template v-if="showSmsCode">
                <b-form-group>
                    <sms-code :phone="phone" :code.sync="code" v-if="showSmsCode" :start="true"></sms-code>
                </b-form-group>

            </template>
        <b-button type="submit">Продолжить</b-button>
         </b-form>
        </div>


    </div>
</template>

<script>
    import smsCode from './sms-code.vue'

    export default {
        components: {
            'sms-code': smsCode
        },
        watch: {
            state () {
                this.showSmsCode = this.state === 'NEW_PHONE' || this.state === 'NEW_PASSWORD'
                this.showPasswordConfirm = this.state === 'NEW_PHONE';
                if (this.state === 'SUCCESS') {
                    location.reload();
                }
            },
        },
        data () {
            return {
                phone: '',
                password: '',
                confirmPassword: '',
                code: null,
                state: false,
                showSmsCode: false,
                showPasswordConfirm: false
            }
        },
        methods: {
            submitForm (e) {
                alert (this.$config.host);
                e.preventDefault();
                let self = this;
                if (this.showPasswordConfirm && this.password !== this.confirmPassword) {

                    return;
                }
                if (this.showSmsCode && this.code === '') {

                    return;
                }
                let fd = new FormData();
                fd.append('phone', this.phone);
                fd.append('password', this.password);
                fd.append('code', this.code);
                this.$http({
                    method: 'post',
                    url: this.$config.domain + '/auth',
                    data: fd
                }).then(this.processResponse);

            },
            processResponse (resp) {
                if(resp.data && resp.data.state) {
                    this.state = resp.data.state;
                } else {

                }
            },

        }
    }
</script>

<style scoped>
    #login-form {
        padding: 10px;
        background: #f0f0f0
    }
</style>