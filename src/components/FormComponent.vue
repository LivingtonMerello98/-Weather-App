<script>
export default {
    name: 'FormComponent'
}

</script>

<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-12 text-light">
                <h3>Inviaci un Messaggio</h3>
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">Nome</label>
                        <input type="text" id="name" class="form-control" placeholder="Inserisci il tuo nome" required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Inserisci la tua email" required />
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Messaggio</label>
                        <textarea id="message" class="form-control" rows="4" placeholder="Inserisci il tuo messaggio"
                            required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Invia</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss" scoped></style>  