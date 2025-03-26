<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { user } = data;
	const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>Profile | {user.name}</title>
</svelte:head>

<div class="profile-container">
	<div class="profile-header">
		<h1>User Profile</h1>
	</div>

	<div class="profile-card">
		<div class="avatar">
			<div class="avatar-placeholder">{user.name.charAt(0)}</div>
		</div>

		<div class="user-info">
			<h2>{user.name}</h2>
			<p class="username">@{user.username}</p>

			<div class="info-section">
				<div class="info-item">
					<span class="label">Email:</span>
					<span class="value">{user.email}</span>
				</div>

				<div class="info-item">
					<span class="label">Phone:</span>
					<span class="value">{user.phone}</span>
				</div>

				<div class="info-item">
					<span class="label">Location:</span>
					<span class="value">{user.location}</span>
				</div>

				<div class="info-item">
					<span class="label">Member since:</span>
					<span class="value">{formattedDate}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.profile-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.profile-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.profile-card {
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.profile-card {
			flex-direction: row;
		}
	}

	.avatar {
		display: flex;
		justify-content: center;
	}

	.avatar-placeholder {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-color: #4caf50;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		font-weight: bold;
	}

	.user-info {
		flex: 1;
	}

	h2 {
		margin: 0;
		color: #333;
		font-size: 1.8rem;
	}

	.username {
		color: #666;
		margin: 0.5rem 0 1.5rem;
		font-size: 1.1rem;
	}

	.info-section {
		display: grid;
		gap: 1rem;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	@media (min-width: 640px) {
		.info-section {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.label {
		font-weight: 600;
		color: #555;
		font-size: 0.9rem;
	}

	.value {
		color: #333;
		font-size: 1.1rem;
	}

	.actions {
		margin-top: 2rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.edit-profile {
		background-color: #4caf50;
		color: white;
	}

	.edit-profile:hover {
		background-color: #3d8b40;
	}

	.view-donations {
		background-color: #f5f5f5;
		color: #333;
	}

	.view-donations:hover {
		background-color: #e0e0e0;
	}
</style>
