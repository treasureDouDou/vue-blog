<template>
    <div :class="['ivu-back-top',{'ivu-back-top-show':backTop}]" :style="styles" @click="back">
        <slot>
            <div class="ivu-back-top-inner">
                <i class="ivu-icon ivu-icon-chevron-up"></i>
            </div>
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 400
        },
        bottom: {
            type: Number,
            default: 30
        },
        right: {
            type: Number,
            default: 30
        },
        duration: {
            type: Number,
            default: 1500
        },
        listen: {
            type: String,
            default: 'window'
        }
    },
    data() {
        return {
            backTop: false,
            prefixCls: 'ivu-back-top'
        }
    },
    mounted() {
        this.listener && this.listener.addEventListener('scroll', this.handleScroll, false)
        this.listener && this.listener.addEventListener('resize', this.handleScroll, false)
    },
    beforeDestroy() {
        this.listener.removeEventListener('scroll', this.handleScroll, false);
        this.listener.removeEventListener('resize', this.handleScroll, false);
    },
    computed: {
        listener() {
            return this.listen == 'window' ? window : document.getElementById(this.listen)
        },
        styles() {
            return {
                bottom: this.bottom + 'px',
                right: this.right + 'px'
            };
        },
    },
    methods: {
        handleScroll() {
            var top = this.listen == 'window' ? window.pageYOffset : this.listener.scrollTop
            this.backTop = top >= this.height
        },
        back() {
            var from = this.listen == 'window' ? document.body.scrollTop : this.listener.scrollTop
            this.scrollTop(this.listener, from, 0, this.duration)
            this.$emit('on-click')
        },
        scrollTop(el, from, to, duration) {
            from = from || 0
            duration = duration || 500
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = (
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) {
                        return window.setTimeout(callback, 1000 / 60);
                    }
                );
            }
            const difference = Math.abs(from - to);
            const step = Math.ceil(difference / duration * 50);

            function scroll(start, end, step) {
                if (start === end) return;

                var d = (start + step > end) ? end : start + step;
                if (start > end) {
                    d = (start - step < end) ? end : start - step;
                }

                if (el === window) {
                    window.scrollTo(d, d);
                } else {
                    el.scrollTop = d;
                }
                window.requestAnimationFrame(function() {
                    scroll(d, end, step)
                });
            }
            scroll(from, to, step);
        }
    }
};
</script>
