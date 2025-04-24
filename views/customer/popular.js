<div class="container mt-4">
  <div class="row align-items-center mb-4 justify-content-between">
    <div class="col-md-6 mb-3 mb-md-0">
      <img
        src="<%= popularBarang.rawBarang.image || 'https://via.placeholder.com/400x300?text=No+Image' %>"
        alt="<%= popularBarang.rawBarang.title %>"
        class="img-fluid rounded shadow-sm w-100"
        style="max-height: 300px; object-fit: cover"
      />
    </div>
    <div class="col-md-5">
      <h3 class="mb-3"><%= popularBarang.rawBarang.title %></h3>
      <p><%= popularBarang.rawBarang.description || "Tidak ada deskripsi" %></p>
      <p>
        <strong>Harga:</strong> Rp <%=
        popularBarang.rawBarang.harga.toLocaleString("id-ID") %>
      </p>
      <p><strong>Stok:</strong> <%= popularBarang.jumlah %></p>
      <% if (popularBarang.lokasi) { %>
      <p>
        <small class="text-muted">Lokasi: <%= popularBarang.lokasi %></small>
      </p>
      <% } %>
    </div>
  </div>

  <h3 class="mt-3">More Products</h3>
  <div class="row">
    <% stocks.forEach(s => { %>
    <div class="col-md-4 mb-4">
      <div
        class="card h-100 shadow-sm <%= s.jumlah === 0 ? 'opacity-25 pointer-events-none' : '' %>"
      >
        <% if (s.rawBarang.image) { %>
        <img
          src="<%= s.rawBarang.image %>"
          class="card-img-top"
          alt="<%= s.rawBarang.title %>"
        />
        <% } else { %>
        <img
          src="https://via.placeholder.com/300x200?text=No+Image"
          class="card-img-top"
          alt="No Image"
        />
        <% } %>

        <div class="card-body d-flex flex-column">
          <h5 class="card-title"><%= s.rawBarang.title %></h5>
          <p class="card-text">
            <%= s.rawBarang.description || "Tidak ada deskripsi" %>
          </p>
          <p class="card-text">
            <strong>Harga:</strong> Rp <%=
            s.rawBarang.harga.toLocaleString("id-ID") %>
          </p>
          <p class="card-text">
            <strong>Stok Tersedia:</strong> <%= s.jumlah %>
          </p>
          <% if (s.lokasi) { %>
          <p class="card-text">
            <small class="text-muted">Lokasi: <%= s.lokasi %></small>
          </p>
          <% } %>
        </div>
      </div>
    </div>
    <% }) %>
  </div>
</div>
