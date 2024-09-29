<script>
export default {
    data() {
        return {
            name: 'ServiceComponent',
            services: [
                {
                    id: 1,
                    icon: 'code',
                    title: 'Sviluppo Web',
                    description: 'Creiamo siti web su misura con le ultime tecnologie e pratiche.'
                },
                {
                    id: 2,
                    icon: 'paint-brush',
                    title: 'Design Grafico',
                    description: 'Progettiamo grafiche accattivanti e professionali per la tua brand identity.'
                },
                {
                    id: 3,
                    icon: 'rocket',
                    title: 'Innovazione',
                    description: 'Offriamo soluzioni innovative per aiutare il tuo business a crescere.'
                },
                {
                    id: 4,
                    icon: 'handshake',
                    title: 'Collaborazione',
                    description: 'Lavoriamo a stretto contatto con te per realizzare i tuoi obiettivi.'
                }
            ]
        }
    }
}
</script>

<template>
    <div class="container py-5">
        <!-- Sezione dei servizi -->
        <div class="row mb-4">
            <div class="col-md-12 text-center text-light py-3">
                <h3 class="fw-bold">Io sono il componente dedicato ai servizi</h3>
                <p class="fw-light">questo è il mio contenuto</p>
            </div>
        </div>

        <!-- Box dei servizi -->
        <div class="row text-center mb-3">
            <div class="col-md-6 col-lg-3 mb-4" v-for="service in services" :key="service.id">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                        <font-awesome-icon :icon="service.icon" class="text-primary fs-1 mb-3" />
                        <h5 class="card-title fw-bold">{{ service.title }}</h5>
                        <p class="card-text text-muted">{{ service.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 text-center">
            <button class="btn btn-primary">Go to somewhere</button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>