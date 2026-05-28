<script setup>
import { computed, onMounted, ref } from 'vue';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL !== undefined
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:4000';

const loading = ref(true);
const error = ref(null);

const status = ref(null);
const info = ref(null);
const health = ref(null);
const live = ref(null);
const ready = ref(null);

const currentYear = new Date().getFullYear();

const isApiOnline = computed(() => {
  return (
    status.value?.apiStatus === 'online' &&
    health.value?.status === 'ok' &&
    live.value?.status === 'alive' &&
    ready.value?.status === 'ready'
  );
});

async function fetchJson(path) {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${path} returned ${response.status}`);
  }

  return response.json();
}

async function loadDashboardData() {
  loading.value = true;
  error.value = null;

  try {
    const [statusData, infoData, healthData, liveData, readyData] =
      await Promise.all([
        fetchJson('/api/status'),
        fetchJson('/api/info'),
        fetchJson('/health'),
        fetchJson('/health/live'),
        fetchJson('/health/ready')
      ]);

    status.value = statusData;
    info.value = infoData;
    health.value = healthData;
    live.value = liveData;
    ready.value = readyData;
  } catch (err) {
    error.value =
      err.message ||
      'The frontend could not connect to the backend API.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadDashboardData();
});
</script>

<template>
  <main class="page">
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">DevOps Portfolio Project</p>

        <h1>Kubernetes Deployment Lab</h1>

        <p class="hero-text">
          A containerized full-stack application prepared for Docker,
          Kubernetes deployments, health checks, services and scaling.
        </p>

        <div class="hero-actions">
          <button class="primary-button" @click="loadDashboardData">
            Refresh status
          </button>

          <span
            class="status-pill"
            :class="{ online: isApiOnline, offline: !isApiOnline }"
          >
            {{ isApiOnline ? 'API Online' : 'API Offline' }}
          </span>
        </div>
      </div>

      <div class="hero-card">
        <p class="card-label">Runtime Environment</p>
        <strong>{{ status?.environment || 'unknown' }}</strong>
        <span>{{ status?.service || 'Kubernetes Deployment Lab API' }}</span>
      </div>
    </section>

    <section v-if="loading" class="state-box">
      Loading backend status...
    </section>

    <section v-else-if="error" class="state-box error-box">
      <h2>Connection Error</h2>
      <p>{{ error }}</p>
      <p class="hint">
        Make sure the backend is running on port 4000.
      </p>
    </section>

    <section v-else class="dashboard">
      <article class="card">
        <p class="card-label">API Status</p>
        <h2>{{ status.apiStatus }}</h2>
        <p>{{ status.service }}</p>
      </article>

      <article class="card">
        <p class="card-label">Version</p>
        <h2>{{ status.version }}</h2>
        <p>Application release version</p>
      </article>

      <article class="card">
        <p class="card-label">Uptime</p>
        <h2>{{ status.uptime.readable }}</h2>
        <p>{{ status.uptime.seconds }} seconds</p>
      </article>

      <article class="card">
        <p class="card-label">Hostname / Pod</p>
        <h2>{{ info.host.podName }}</h2>
        <p>{{ status.system.platform }} / {{ status.system.architecture }}</p>
      </article>

      <article class="card success">
        <p class="card-label">Health Check</p>
        <h2>{{ health.status }}</h2>
        <p>{{ health.message }}</p>
      </article>

      <article class="card success">
        <p class="card-label">Liveness Probe</p>
        <h2>{{ live.status }}</h2>
        <p>{{ live.message }}</p>
      </article>

      <article class="card success">
        <p class="card-label">Readiness Probe</p>
        <h2>{{ ready.status }}</h2>
        <p>{{ ready.message }}</p>
      </article>

      <article class="card">
        <p class="card-label">Kubernetes Ready</p>
        <h2>
          {{ info.deployment.kubernetesReady ? 'Yes' : 'No' }}
        </h2>
        <p>
          Liveness: {{ info.deployment.healthChecks.liveness }}<br />
          Readiness: {{ info.deployment.healthChecks.readiness }}
        </p>
      </article>
    </section>

    <section v-if="info" class="endpoint-section">
      <h2>Available API Endpoints</h2>

      <div class="endpoint-list">
        <div
          v-for="endpoint in info.endpoints"
          :key="endpoint.path"
          class="endpoint-item"
        >
          <span class="method">{{ endpoint.method }}</span>
          <code>{{ endpoint.path }}</code>
          <p>{{ endpoint.description }}</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      © {{ currentYear }} Bleriot Wafo, Kubernetes Deployment Lab
    </footer>
  </main>
</template>