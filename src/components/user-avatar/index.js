/**
 *
 *作者：葛以伟
 *时间：14:03 2021-02-02
 *描述：
 *
 **/
import UserAvatar from './UserAvatar.vue';

UserAvatar.install = Vue => {
    Vue.component(UserAvatar.name, UserAvatar);
}

export default UserAvatar;