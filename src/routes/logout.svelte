<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    const Logout = async () => {
        $session.token = '';
        goto('/')
    }
    Logout()
</script>