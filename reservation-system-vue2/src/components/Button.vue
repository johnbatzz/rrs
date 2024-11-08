<template>
    <button @click.stop="handleClick">{{ text }}</button>
</template>

<script>

export default{
    props: {
        text: () => {
            return ''
        },
        callback: Function
    },
    methods: {
        handleClick() {
           this.callback();
        }
    }
}
</script>
