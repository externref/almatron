<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';

	export let form: ActionData;

	function _a(form: ActionData) {
		if (form?.success) {
			goto('/');
		}
	}
	$: x = _a(form);

	export let foodname: string = '';
	export let description: string = '';
	export let location: string = '';
	export let quantity: number = 1;
	export let expirationDate: string = '';
	export let imageFile: File | null = null;

	let imagePreview: string | null = null;

	// List of major Indian districts by state
	const indianDistricts = [
		'Adilabad',
		'Anantapur',
		'Chittoor',
		'Kakinada',
		'Guntur',
		'Hyderabad',
		'Karimnagar',
		'Khammam',
		'Krishna',
		'Kurnool',
		'Mahbubnagar',
		'Medak',
		'Nalgonda',
		'Nizamabad',
		'Ongole',
		'Hyderabad',
		'Srikakulam',
		'Nellore',
		'Visakhapatnam',
		'Vizianagaram',
		'Warangal',
		'Eluru',
		'Kadapa',
		'Anjaw',
		'Changlang',
		'East Siang',
		'Kurung Kumey',
		'Lohit',
		'Lower Dibang Valley',
		'Lower Subansiri',
		'Papum Pare',
		'Tawang',
		'Tirap',
		'Dibang Valley',
		'Upper Siang',
		'Upper Subansiri',
		'West Kameng',
		'West Siang',
		'Baksa',
		'Barpeta',
		'Bongaigaon',
		'Cachar',
		'Chirang',
		'Darrang',
		'Dhemaji',
		'Dima Hasao',
		'Dhubri',
		'Dibrugarh',
		'Goalpara',
		'Golaghat',
		'Hailakandi',
		'Jorhat',
		'Kamrup',
		'Kamrup Metropolitan',
		'Karbi Anglong',
		'Karimganj',
		'Kokrajhar',
		'Lakhimpur',
		'Marigaon',
		'Nagaon',
		'Nalbari',
		'Sibsagar',
		'Sonitpur',
		'Tinsukia',
		'Udalguri',
		'Araria',
		'Arwal',
		'Aurangabad',
		'Banka',
		'Begusarai',
		'Bhagalpur',
		'Bhojpur',
		'Buxar',
		'Darbhanga',
		'East Champaran',
		'Gaya',
		'Gopalganj',
		'Jamui',
		'Jehanabad',
		'Kaimur',
		'Katihar',
		'Khagaria',
		'Kishanganj',
		'Lakhisarai',
		'Madhepura',
		'Madhubani',
		'Munger',
		'Muzaffarpur',
		'Nalanda',
		'Nawada',
		'Patna',
		'Purnia',
		'Rohtas',
		'Saharsa',
		'Samastipur',
		'Saran',
		'Sheikhpura',
		'Sheohar',
		'Sitamarhi',
		'Siwan',
		'Supaul',
		'Vaishali',
		'West Champaran',
		'Chandigarh',
		'Bastar',
		'Bijapur',
		'Bilaspur',
		'Dantewada',
		'Dhamtari',
		'Durg',
		'Jashpur',
		'Janjgir-Champa',
		'Korba',
		'Koriya',
		'Kanker',
		'Kabirdham (Kawardha)',
		'Mahasamund',
		'Narayanpur',
		'Raigarh',
		'Rajnandgaon',
		'Raipur',
		'Surguja',
		'Dadra and Nagar Haveli',
		'Daman',
		'Diu',
		'Central Delhi',
		'East Delhi',
		'New Delhi',
		'North Delhi',
		'North East Delhi',
		'North West Delhi',
		'South Delhi',
		'South West Delhi',
		'West Delhi',
		'North Goa',
		'South Goa',
		'Ahmedabad',
		'Amreli district',
		'Anand',
		'Banaskantha',
		'Bharuch',
		'Bhavnagar',
		'Dahod',
		'The Dangs',
		'Gandhinagar',
		'Jamnagar',
		'Junagadh',
		'Kutch',
		'Kheda',
		'Mehsana',
		'Narmada',
		'Navsari',
		'Patan',
		'Panchmahal',
		'Porbandar',
		'Rajkot',
		'Sabarkantha',
		'Surendranagar',
		'Surat',
		'Vyara',
		'Vadodara',
		'Valsad',
		'Ambala',
		'Bhiwani',
		'Faridabad',
		'Fatehabad',
		'Gurgaon',
		'Hissar',
		'Jhajjar',
		'Jind',
		'Karnal',
		'Kaithal',
		'Kurukshetra',
		'Mahendragarh',
		'Mewat',
		'Palwal',
		'Panchkula',
		'Panipat',
		'Rewari',
		'Rohtak',
		'Sirsa',
		'Sonipat',
		'Yamuna Nagar',
		'Bilaspur',
		'Chamba',
		'Hamirpur',
		'Kangra',
		'Kinnaur',
		'Kullu',
		'Lahaul and Spiti',
		'Mandi',
		'Shimla',
		'Sirmaur',
		'Solan',
		'Una',
		'Anantnag',
		'Badgam',
		'Bandipora',
		'Baramulla',
		'Doda',
		'Ganderbal',
		'Jammu',
		'Kargil',
		'Kathua',
		'Kishtwar',
		'Kupwara',
		'Kulgam',
		'Leh',
		'Poonch',
		'Pulwama',
		'Rajauri',
		'Ramban',
		'Reasi',
		'Samba',
		'Shopian',
		'Srinagar',
		'Udhampur',
		'Bokaro',
		'Chatra',
		'Deoghar',
		'Dhanbad',
		'Dumka',
		'East Singhbhum',
		'Garhwa',
		'Giridih',
		'Godda',
		'Gumla',
		'Hazaribag',
		'Jamtara',
		'Khunti',
		'Koderma',
		'Latehar',
		'Lohardaga',
		'Pakur',
		'Palamu',
		'Ramgarh',
		'Ranchi',
		'Sahibganj',
		'Seraikela Kharsawan',
		'Simdega',
		'West Singhbhum',
		'Bagalkot',
		'Bangalore Rural',
		'Bangalore Urban',
		'Belgaum',
		'Bellary',
		'Bidar',
		'Bijapur',
		'Chamarajnagar',
		'Chikkamagaluru',
		'Chikkaballapur',
		'Chitradurga',
		'Davanagere',
		'Dharwad',
		'Dakshina Kannada',
		'Gadag',
		'Gulbarga',
		'Hassan',
		'Haveri district',
		'Kodagu',
		'Kolar',
		'Koppal',
		'Mandya',
		'Mysore',
		'Raichur',
		'Shimoga',
		'Tumkur',
		'Udupi',
		'Uttara Kannada',
		'Ramanagara',
		'Yadgir',
		'Alappuzha',
		'Ernakulam',
		'Idukki',
		'Kannur',
		'Kasaragod',
		'Kollam',
		'Kottayam',
		'Kozhikode',
		'Malappuram',
		'Palakkad',
		'Pathanamthitta',
		'Thrissur',
		'Thiruvananthapuram',
		'Wayanad',
		'Alirajpur',
		'Anuppur',
		'Ashok Nagar',
		'Balaghat',
		'Barwani',
		'Betul',
		'Bhind',
		'Bhopal',
		'Burhanpur',
		'Chhatarpur',
		'Chhindwara',
		'Damoh',
		'Datia',
		'Dewas',
		'Dhar',
		'Dindori',
		'Guna',
		'Gwalior',
		'Harda',
		'Hoshangabad',
		'Indore',
		'Jabalpur',
		'Jhabua',
		'Katni',
		'Khandwa (East Nimar)',
		'Khargone (West Nimar)',
		'Mandla',
		'Mandsaur',
		'Morena',
		'Narsinghpur',
		'Neemuch',
		'Panna',
		'Rewa',
		'Rajgarh',
		'Ratlam',
		'Raisen',
		'Sagar',
		'Satna',
		'Sehore',
		'Seoni',
		'Shahdol',
		'Shajapur',
		'Sheopur',
		'Shivpuri',
		'Sidhi',
		'Singrauli',
		'Tikamgarh',
		'Ujjain',
		'Umaria',
		'Vidisha',
		'Ahmednagar',
		'Akola',
		'Amravati',
		'Aurangabad',
		'Bhandara',
		'Beed',
		'Buldhana',
		'Chandrapur',
		'Dhule',
		'Gadchiroli',
		'Gondia',
		'Hingoli',
		'Jalgaon',
		'Jalna',
		'Kolhapur',
		'Latur',
		'Mumbai City',
		'Mumbai suburban',
		'Nandurbar',
		'Nanded',
		'Nagpur',
		'Nashik',
		'Osmanabad',
		'Parbhani',
		'Pune',
		'Raigad',
		'Ratnagiri',
		'Sindhudurg',
		'Sangli',
		'Solapur',
		'Satara',
		'Thane',
		'Wardha',
		'Washim',
		'Yavatmal',
		'Bishnupur',
		'Churachandpur',
		'Chandel',
		'Imphal East',
		'Senapati',
		'Tamenglong',
		'Thoubal',
		'Ukhrul',
		'Imphal West',
		'East Garo Hills',
		'East Khasi Hills',
		'Jaintia Hills',
		'Ri Bhoi',
		'South Garo Hills',
		'West Garo Hills',
		'West Khasi Hills',
		'Aizawl',
		'Champhai',
		'Kolasib',
		'Lawngtlai',
		'Lunglei',
		'Mamit',
		'Saiha',
		'Serchhip',
		'Dimapur',
		'Kohima',
		'Mokokchung',
		'Mon',
		'Phek',
		'Tuensang',
		'Wokha',
		'Zunheboto',
		'Angul',
		'Boudh (Bauda)',
		'Bhadrak',
		'Balangir',
		'Bargarh (Baragarh)',
		'Balasore',
		'Cuttack',
		'Debagarh (Deogarh)',
		'Dhenkanal',
		'Ganjam',
		'Gajapati',
		'Jharsuguda',
		'Jajpur',
		'Jagatsinghpur',
		'Khordha',
		'Kendujhar (Keonjhar)',
		'Kalahandi',
		'Kandhamal',
		'Koraput',
		'Kendrapara',
		'Malkangiri',
		'Mayurbhanj',
		'Nabarangpur',
		'Nuapada',
		'Nayagarh',
		'Puri',
		'Rayagada',
		'Sambalpur',
		'Subarnapur (Sonepur)',
		'Sundergarh',
		'Karaikal',
		'Mahe',
		'Pondicherry',
		'Yanam',
		'Amritsar',
		'Barnala',
		'Bathinda',
		'Firozpur',
		'Faridkot',
		'Fatehgarh Sahib',
		'Fazilka',
		'Gurdaspur',
		'Hoshiarpur',
		'Jalandhar',
		'Kapurthala',
		'Ludhiana',
		'Mansa',
		'Moga',
		'Sri Muktsar Sahib',
		'Pathankot',
		'Patiala',
		'Rupnagar',
		'Ajitgarh (Mohali)',
		'Sangrur',
		'Nawanshahr',
		'Tarn Taran',
		'Ajmer',
		'Alwar',
		'Bikaner',
		'Barmer',
		'Banswara',
		'Bharatpur',
		'Baran',
		'Bundi',
		'Bhilwara',
		'Churu',
		'Chittorgarh',
		'Dausa',
		'Dholpur',
		'Dungapur',
		'Ganganagar',
		'Hanumangarh',
		'Jhunjhunu',
		'Jalore',
		'Jodhpur',
		'Jaipur',
		'Jaisalmer',
		'Jhalawar',
		'Karauli',
		'Kota',
		'Nagaur',
		'Pali',
		'Pratapgarh',
		'Rajsamand',
		'Sikar',
		'Sawai Madhopur',
		'Sirohi',
		'Tonk',
		'Udaipur',
		'East Sikkim',
		'North Sikkim',
		'South Sikkim',
		'West Sikkim',
		'Ariyalur',
		'Chennai',
		'Coimbatore',
		'Cuddalore',
		'Dharmapuri',
		'Dindigul',
		'Erode',
		'Kanchipuram',
		'Kanyakumari',
		'Karur',
		'Madurai',
		'Nagapattinam',
		'Nilgiris',
		'Namakkal',
		'Perambalur',
		'Pudukkottai',
		'Ramanathapuram',
		'Salem',
		'Sivaganga',
		'Tirupur',
		'Tiruchirappalli',
		'Theni',
		'Tirunelveli',
		'Thanjavur',
		'Thoothukudi',
		'Tiruvallur',
		'Tiruvarur',
		'Tiruvannamalai',
		'Vellore',
		'Viluppuram',
		'Virudhunagar',
		'Dhalai',
		'North Tripura',
		'South Tripura',
		'Khowai',
		'West Tripura',
		'Agra',
		'Allahabad',
		'Aligarh',
		'Ambedkar Nagar',
		'Auraiya',
		'Azamgarh',
		'Barabanki',
		'Budaun',
		'Bagpat',
		'Bahraich',
		'Bijnor',
		'Ballia',
		'Banda',
		'Balrampur',
		'Bareilly',
		'Basti',
		'Bulandshahr',
		'Chandauli',
		'Chhatrapati Shahuji Maharaj Nagar',
		'Chitrakoot',
		'Deoria',
		'Etah',
		'Kanshi Ram Nagar',
		'Etawah',
		'Firozabad',
		'Farrukhabad',
		'Fatehpur',
		'Faizabad',
		'Gautam Buddh Nagar',
		'Gonda',
		'Ghazipur',
		'Gorakhpur',
		'Ghaziabad',
		'Hamirpur',
		'Hardoi',
		'Mahamaya Nagar',
		'Jhansi',
		'Jalaun',
		'Jyotiba Phule Nagar',
		'Jaunpur district',
		'Ramabai Nagar (Kanpur Dehat)',
		'Kannauj',
		'Kanpur',
		'Kaushambi',
		'Kushinagar',
		'Lalitpur',
		'Lakhimpur Kheri',
		'Lucknow',
		'Mau',
		'Meerut',
		'Maharajganj',
		'Mahoba',
		'Mirzapur',
		'Moradabad',
		'Mainpuri',
		'Mathura',
		'Muzaffarnagar',
		'Panchsheel Nagar district (Hapur)',
		'Pilibhit',
		'Shamli',
		'Pratapgarh',
		'Rampur',
		'Raebareli',
		'Saharanpur',
		'Sitapur',
		'Shahjahanpur',
		'Sant Kabir Nagar',
		'Siddharthnagar',
		'Sonbhadra',
		'Sant Ravidas Nagar',
		'Sultanpur',
		'Shravasti',
		'Unnao',
		'Varanasi',
		'Almora',
		'Bageshwar',
		'Chamoli',
		'Champawat',
		'Dehradun',
		'Haridwar',
		'Nainital',
		'Pauri Garhwal',
		'Pithoragarh',
		'Rudraprayag',
		'Tehri Garhwal',
		'Udham Singh Nagar',
		'Uttarkashi',
		'Birbhum',
		'Bankura',
		'Bardhaman',
		'Darjeeling',
		'Dakshin Dinajpur',
		'Hooghly',
		'Howrah',
		'Jalpaiguri',
		'Cooch Behar',
		'Kolkata',
		'Maldah',
		'Paschim Medinipur',
		'Purba Medinipur',
		'Murshidabad',
		'Nadia',
		'North 24 Parganas',
		'South 24 Parganas',
		'Purulia',
		'Uttar Dinajpur'
	].sort();

	let submitting = false;
	let errorMessage = '';

	function handleSubmit() {
		submitting = true;
		errorMessage = '';
		// @ts-ignore
		return ({ result, update }) => {
			submitting = false;

			if (result.type === 'failure') {
				errorMessage = result.data?.error || 'Something went wrong';
			}

			update();
		};
	}

	function handleImageUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			imageFile = file;
			imagePreview = URL.createObjectURL(file);

			return () => {
				if (imagePreview) URL.revokeObjectURL(imagePreview);
			};
		}
	}
</script>

<div>
	<p class="text-4xl text-center">Donate Food Item</p>
	<div class="h-[1.5px] bg-catp-overlay0 mx-12 my-2"></div>

	{#if errorMessage}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-8 mb-4">
			<span class="block sm:inline">{errorMessage}</span>
		</div>
	{/if}

	<form method="POST" use:enhance={handleSubmit} enctype="multipart/form-data">
		<div class="grid grid-cols-2 gap-6 m-8">
			<div>
				<label class="text-black text-base ml-2 mb-0.5" for="_name"
					>Food Name <span class="text-red-500">*</span></label
				><br />
				<input
					id="_name"
					name="foodname"
					bind:value={foodname}
					placeholder="Food Item name"
					required
					class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
				/>
			</div>

			<div>
				<label class="text-black text-base ml-2 mb-0.5" for="_location"
					>Location <span class="text-red-500">*</span></label
				><br />
				<select
					id="_location"
					name="location"
					bind:value={location}
					required
					class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
				>
					<option value="">Select a district</option>
					{#each indianDistricts as district}
						<option value={district}>{district}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="text-black text-base ml-2 mb-0.5" for="_description">Description</label><br />
				<textarea
					id="_description"
					name="description"
					bind:value={description}
					placeholder="Describe the food item"
					class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
					rows="3"
				></textarea>
			</div>

			<div>
				<label class="text-black text-base ml-2 mb-0.5" for="_expirationDate"
					>Expiration Date <span class="text-red-500">*</span></label
				><br />
				<input
					id="_expirationDate"
					name="expirationDate"
					type="date"
					bind:value={expirationDate}
					required
					class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
				/>
			</div>

			<div class="col-span-2">
				<label class="text-black text-base ml-2 mb-0.5" for="_quantity">Quantity: {quantity}</label
				><br />
				<input
					id="_quantity"
					name="quantity"
					type="range"
					bind:value={quantity}
					min="1"
					max="100"
					class="w-full h-2 bg-orange-500/30 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all duration-200"
				/>
			</div>

			<div class="col-span-2">
				<label class="text-black text-base ml-2 mb-0.5" for="_image"
					>Food Image <span class="text-red-500">*</span></label
				><br />
				<div class="flex flex-col items-center">
					{#if imagePreview}
						<img
							src={imagePreview}
							alt="Preview"
							class="mb-2 w-64 h-64 object-cover rounded-lg border-2 border-orange-500/30"
						/>
					{:else}
						<div
							class="mb-2 w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-orange-500/30"
						>
							<p class="text-gray-500">Image preview</p>
						</div>
					{/if}
					<input
						id="_image"
						name="imageFile"
						type="file"
						accept="image/*"
						on:change={handleImageUpload}
						required
						class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
					/>
				</div>
			</div>
		</div>

		<div class="flex justify-center mb-8">
			<button
				type="submit"
				disabled={submitting}
				class="bg-orange-500/80 hover:bg-orange-500/90 text-white font-bold py-2 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{submitting ? 'Submitting...' : 'Submit Donation'}
			</button>
		</div>
	</form>
</div>
