<script>
export default {
    data() {
        return {
            projects: [
                { id: 1, icon: 'laptop-code', title: 'Progetto 1', description: 'Descrizione del progetto 1.' },
                { id: 2, icon: 'mobile-alt', title: 'Progetto 2', description: 'Descrizione del progetto 2.' },
                { id: 3, icon: 'cloud', title: 'Progetto 3', description: 'Descrizione del progetto 3.' },
                { id: 4, icon: 'database', title: 'Progetto 4', description: 'Descrizione del progetto 4.' },
                { id: 2, icon: 'mobile-alt', title: 'Progetto 2', description: 'Descrizione del progetto 2.' },
                { id: 2, icon: 'mobile-alt', title: 'Progetto 2', description: 'Descrizione del progetto 2.' },
            ]
        }
    }
}
</script>

<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-12 text-center text-light">
                <h3 class="text-center mb-4">I Nostri Progetti</h3>
                <p class="text-center mb-4">esplora i nostri progetti</p>
            </div>
            <div class="col-md-4 mb-4" v-for="project in projects" :key="project.id">
                <div class="card text-center border-0 shadow-sm">
                    <div class="card-body">
                        <font-awesome-icon :icon="`fa-${project.icon}`" class="text-primary fs-3 mb-3" />
                        <h5 class="card-title fw-bold">{{ project.title }}</h5>
                        <p class="card-text">{{ project.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped></style>
  