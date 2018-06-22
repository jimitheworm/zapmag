<template>
    <b-form-row>
        <div class="col-6">
            <small>Для продолжения работы вам необходимо
                <a href="" @click.prevent="startCountdown">получить sms код</a>
            </small>

        </div>
        <div class="col-2">

            <div id="countdown">
                <template v-if="counter > 0">
                <div id="countdown-number">{{ counter }}</div>
                <svg>
                    <circle r="18" cx="20" cy="20"></circle>
                </svg>
                </template>
            </div>
        </div>
        <div class="col-4"><input type="text" v-model.trim="code" class="form-control" autocomplete="off"></div>
    </b-form-row>
</template>

<script>
    export default {
        props: ['phone', 'label'],
        data () {
            return {
                counter: 0,
                code: null
            }
        },
        watch: {
            code (val) {
                this.$emit('update:code', val);
            },
            counter (val) {
                if (val == 0) {
                    this.code = null;
                }
            }
        },
        methods: {
            startCountdown () {
                this.sendCode();
                this.counter = 60;
                let timer = setInterval(() => {
                    this.counter--;
                    if (this.counter === 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            },
            sendRequest () {

            },
            sendCode () {
                let fd = new FormData(), self = this;
                fd.append('phone', this.phone);
                this.$http({
                    url: this.$config.domain + '/auth/get-sms-code',
                    method: 'post',
                    data: fd
                }).then(function(resp) {

                });
            }
        }
    }
</script>

<style scoped>
    #countdown {
        position: relative;
        height: 40px;
        width: 40px;
        text-align: center;
    }

    #countdown-number {
        display: inline-block;
        line-height: 40px;
    }

    svg {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        transform: rotateY(-180deg) rotateZ(-90deg);
    }

    svg circle {
        stroke-dasharray: 113px;
        stroke-dashoffset: 0px;
        stroke-linecap: butt;
        stroke-width: 4px;
        stroke: grey;
        fill: none;
        animation: countdown 60s linear forwards;
    }

    @keyframes countdown {
        from {
            stroke-dashoffset: 0px;
        }
        to {
            stroke-dashoffset: 113px;
        }
    }
    small {
        line-height: 1
    }

</style>