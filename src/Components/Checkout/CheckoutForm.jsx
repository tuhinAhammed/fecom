import React, { useEffect, useRef, useState } from "react";
import Container from "../../Layout/Container";
import ExtraMidTitle from "../../Layout/Title/ExtraMidTitle";
import UserAuthInput from "../../Layout/Input/UserAuthInput";
import InputLabel from "../../Layout/Input/InputLabel";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import MidTitle from "../../Layout/Title/MidTitle";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import ExtraMinTitle from "../../Layout/Title/ExtraMinTitle";
import MinTitle from "../../Layout/Title/MinTitle";

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const CheckoutForm = ({
  countries,
  phoneCodes,
  billingFormData,
  setBillingFormData,
  shippingFormData,
  setShippingFormData,
  inputErrors,
  setInputErrors,
  translations,
  customerDefaultAddress,
}) => {
  const [status, setStatus] = useState("");
  const [shippingCities, setShippingCities] = useState([]);
  const [shippingSelectedCity, setShippingSelectedCity] = useState("");
  const [selectedShippingZone, setSelectedShippingZone] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const { currency_symbol, conversion_rate_to_tk } = useSelector(
    (state) => state?.currency?.selectedCurrency || ""
  );

  const [billingSelectedCountry, setBillingSelectedCountry] = useState("");
  const [billingSelectedState, setBillingSelectedState] = useState("");
  const [billingSelectedCity, setBillingSelectedCity] = useState("");
  const [shippingSelectedCountry, setShippingSelectedCountry] = useState("");
  const [shippingSelectedState, setShippingSelectedState] = useState("");
  const [billingCities, setBillingCities] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [billingCityes, setBillingCityes] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);
  const [shippingCityes, setShippingCityes] = useState([]);
  const [billingZones, setBillingZones] = useState([]);
  const [shippingZones, setShippingZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const loginToken = useSelector((state) => state.userData?.data?.token);
  const { first_name, last_name, email } = useSelector(
    (state) => state?.userData?.data?.customer || {}
  );
  // Find default customer address
  const defaultAddress =
    customerDefaultAddress?.find((addr) => addr.is_default === 1) || null;

  // Initialize country, state, city based on default address
  // In the useEffect that initializes the form data, modify it like this:
  useEffect(() => {
    // Always set firstName and lastName if user is logged in (we have first_name)

      let initialData = {
        firstName: "" || "",
        lastName: "" || "",
        email: "" || "",
        phoneCode: "",
        phoneNumber: "",
        country: { name: "", id: null },
        state: { name: "", id: null },
        city: { name: "", id: null },
        billingAddress: "",
        shippingZone: { name: "", price: "", id: null },
      };

      if (loginToken) {  // This checks if user is logged in
        initialData = {
          ...initialData,
          firstName: first_name || "",
          lastName: last_name || "",
          email: email || "",
        };
      }

    // Only proceed with country/address data if we have default address and countries
    if (defaultAddress && countries.length > 0) {
      const country = countries.find((c) => c.id === defaultAddress.country?.id);

      if (country) {
        initialData.phoneCode = defaultAddress?.phonecode || "";
        initialData.phoneNumber = defaultAddress?.phone || "";
        initialData.country = { name: country.name, id: country?.id };
        initialData.state = {
          name: defaultAddress.state?.name,
          id: defaultAddress.state?.id,
        };
        initialData.city = {
          name: defaultAddress.city?.name,
          id: defaultAddress.city?.id,
        };
        initialData.billingAddress = defaultAddress.address || "";

        setBillingStates(country.states || []);

        const state = country.states?.find(
          (s) => s.id === defaultAddress.state?.id
        );
        if (state) {
          setBillingCities(state.cities || []);
        }
      }
    }

    setBillingFormData(initialData);

    // Set phone code if present
    if (phoneCodes && phoneCodes.length > 0 && defaultAddress?.phonecode) {
      const phoneCode = phoneCodes.find(
        (pc) => pc?.phonecode === defaultAddress?.phonecode
      );
      if (phoneCode) {
        setSelectedCode(phoneCode?.phonecode);
        setSelectedFlag(phoneCode?.iso2);
      }
    }
  }, [defaultAddress, countries, phoneCodes, first_name, last_name, email]);

  // Handle address change from the dropdown
  const handleAddressChange = (e) => {
    const selectedAddressId = e.target?.value;
    if (!selectedAddressId) return;

    const selectedAddress = customerDefaultAddress.find(
      (addr) => addr.id.toString() === selectedAddressId
    );
    if (!selectedAddress) return;

    const country = countries.find((c) => c.id === selectedAddress.country.id);
    if (!country) return;

    // Update billing form data
    setBillingFormData({
      firstName: first_name || "",
      lastName: last_name || "",
      email: email || "",
      phoneCode: selectedAddress?.phonecode || "",
      phoneNumber: selectedAddress?.phone || "",
      country: { name: country?.name, id: country?.id },
      state: { name: selectedAddress.state?.name, id: selectedAddress.state?.id },
      city: { name: selectedAddress.city?.name, id: selectedAddress.city?.id },
      billingAddress: selectedAddress.address || "",
      shippingZone: { name: "", price: "", id: null },
    });

    // Update phone code
    if (phoneCodes && phoneCodes.length > 0 && selectedAddress.phonecode) {
      const phoneCode = phoneCodes.find(
        (pc) => pc.phonecode === selectedAddress.phonecode
      );
      if (phoneCode) {
        setSelectedCode(phoneCode.phonecode);
        setSelectedFlag(phoneCode.iso2);
      }
    }

    // Update states and cities
    setBillingStates(country.states || []);
    const state = country.states?.find(
      (s) => s.id === selectedAddress.state.id
    );
    if (state) {
      setBillingCities(state.cities || []);
    }
  };

  useEffect(() => {
    const fetchShippingZones = async () => {
      setLoading(true);
      try {
        // Fetching billing zones
        if (
          billingFormData.country.id &&
          billingFormData.state.id &&
          billingFormData.city.id
        ) {
          const billingResponse = await axios.get(
            `${api}/${version}/shipping-zone/get`,
            {
              params: {
                country_id: billingFormData.country.id,
                state_id: billingFormData.state.id,
                city_id: billingFormData.city.id,
              },
            }
          );
          setBillingZones(billingResponse.data || []);

          // If we have a default address and zones are loaded, set the default zone
          if (
            defaultAddress &&
            billingResponse.data &&
            billingResponse.data.length > 0
          ) {
            // Find a matching zone to set as default
            // Since the exact zone ID might not be returned, we'll set the first one as default
            setBillingFormData((prev) => ({
              ...prev,
              shippingZone: billingResponse.data[0],
            }));
          }
        }

        // Fetching shipping zones
        if (
          shippingFormData.country.id &&
          shippingFormData.state.id &&
          shippingFormData.city.id
        ) {
          const shippingResponse = await axios.get(
            `${api}/${version}/shipping-zone/get`,
            {
              params: {
                country_id: shippingFormData.country.id,
                state_id: shippingFormData.state.id,
                city_id: shippingFormData.city.id,
              },
            }
          );
          setShippingZones(shippingResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching shipping zones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingZones();
  }, [
    shippingFormData.country.id,
    shippingFormData.state.id,
    shippingFormData.city.id,
    billingFormData.country.id,
    billingFormData.state.id,
    billingFormData.city.id,
    defaultAddress,
  ]);

  const handlePhoneCodeChange = (selectedCode) => {
    setBillingFormData({
      ...billingFormData,
      phoneCode: selectedCode,
    });
  };

  const handleCheckbox = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    const checked = isCheckbox
      ? e.target.checked
      : !billingFormData.shipToAnotherAddress;

    // Update the checkbox state
    setBillingFormData({ ...billingFormData, shipToAnotherAddress: checked });

    // Clear shipping-related errors when the checkbox state changes
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      shippingAddress: "", // Clear shipping address error
      shippingZone: "", // Clear shipping zone error
      // Add other shipping-related fields here if needed
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState(
    defaultAddress?.phonecode || phoneCodes?.[0]?.phonecode || "+1"
  );
  const [selectedFlag, setSelectedFlag] = useState(
    phoneCodes?.find((pc) => pc.phonecode === defaultAddress?.phonecode)
      ?.iso2 ||
      phoneCodes?.[0]?.iso2 ||
      "us"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    setBillingFormData({ ...billingFormData, phoneCode: selectedCode });
  }, [selectedCode]);

  useEffect(() => {
    if (phoneCodes?.length > 0) {
      const defaultCode =
        phoneCodes.find(
          (code) => code.phonecode === defaultAddress?.phonecode
        ) ||
        phoneCodes.find((code) => code.iso2 === "us") ||
        phoneCodes[0];

      setSelectedCode(defaultCode?.phonecode || "+1");
      setSelectedFlag(defaultCode?.iso2 || "us");
      setBillingFormData((prev) => ({
        ...prev,
        phoneCode: defaultCode?.phonecode || "+1",
      }));
    }
  }, [phoneCodes, defaultAddress]);

  const handleChange = (name, value, isShipping = false) => {
    if (isShipping) {
      setShippingFormData({ ...shippingFormData, [name]: value });
    } else {
      setBillingFormData({ ...billingFormData, [name]: value });
    }
    setInputErrors({ ...inputErrors, [name]: "" }); // Clear error for this input
  };

  const handleSelect = (code, iso2) => {
    setSelectedCode(code);
    setSelectedFlag(iso2);
    setIsOpen(false);
    setBillingFormData((prev) => ({
      ...prev,
      phoneCode: code,
    }));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleBillingCountryChange = (e) => {
    const selectedCountry = countries.find((c) => c.name === e.target.value);
    if (selectedCountry) {
      setBillingFormData({
        ...billingFormData,
        country: { name: selectedCountry.name, id: selectedCountry.id },
        state: { name: "", id: null },
        city: { name: "", id: null },
      });
      setBillingSelectedState("");
      setBillingSelectedCity("");
      setBillingStates(selectedCountry.states);
    }
  };

  const handleBillingStateChange = (e) => {
    const selectedState = billingStates.find((s) => s.name === e.target.value);
    if (selectedState) {
      setBillingFormData({
        ...billingFormData,
        state: { name: selectedState.name, id: selectedState.id },
      });
      setBillingCities(selectedState.cities);
      setBillingSelectedCity("");
    }
  };

  const handleBillingCityChange = (e) => {
    const city = billingCities.find((c) => c.name === e.target.value);
    if (city) {
      setBillingFormData({
        ...billingFormData,
        city: { name: city.name, id: city.id },
      });
    }
  };

  const handleShippingCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    if (country) {
      setShippingFormData({
        ...shippingFormData,
        country: { name: country.name, id: country.id },
        state: { name: "", id: null },
        city: { name: "", id: null },
        shippingZone: { name: "", price: "", id: null },
      });
      setShippingStates(country.states);
    }
  };

  const handleShippingStateChange = (e) => {
    const state = shippingStates.find((s) => s.name === e.target.value);
    if (state) {
      setShippingFormData({
        ...shippingFormData,
        state: { name: state.name, id: state.id },
        city: { name: "", id: null },
        shippingZone: { name: "", price: "", id: null },
      });
      setShippingCityes(state.cities);
    }
  };

  const handleShippingCityChange = (e) => {
    const city = shippingCityes.find((c) => c.name === e.target.value);
    if (city) {
      setShippingFormData({
        ...shippingFormData,
        city: { name: city.name, id: city.id },
        shippingZone: { name: "", price: "", id: null },
      });
    }
  };

  return (
    <div className="py-[20px] sm:py-sectionSm lg:py-sectionSm shadow-[0_0_20px_rgba(0,0,0,0.15)]">
<div className="overflow-hidden rounded-md bg-secondary px-2 sm:px-4 md:px-6 lg:px-6">


          <div className="p-4 bg-theme bg-opacity-[0.2]">
          <ExtraMidTitle
            className="!font-semibold"
            text="Quick Checkout Form"
          />
          <MinTitle className="pt-1" text="Fill in just 4 simple fields!"/>
          </div>
          {/* <hr className="w-1/2 h-[1px] md:h-[2px] bg-primary mt-1"></hr> */}
        <form action="" method="post">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 pt-4">
            {/* First Name */}
            <div className="">
              <InputLabel
                text="First Name"
                required={true}
              />
              <UserAuthInput
                onChange={(name, value) => handleChange("firstName", value)}
                type="text"
                value={billingFormData.firstName}
                placeholder="Enter Your First Name"
                name="firstName"
                required="true"
                className="border-borderColor focus:border-theme !outline-0 !ring-0 focus:!ring-0 mt-1 lg:mt-2"
              />
              {inputErrors.firstName && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.firstName}
                </p>
              )}
            </div>
            {/* Last Name */}
            <div className="">
              <InputLabel
                text="Last Name"
                required={false}
              />
              <UserAuthInput
                onChange={(name, value) => handleChange("lastName", value)}
                type="text"
                value={billingFormData.lastName}
                placeholder="Enter Your Last Name"
                name="lastName"
                required="true"
                className="border-borderColor focus:border-theme !outline-0 !ring-0 focus:!ring-0 mt-1 lg:mt-2"
              />
            </div>

            {/* Email */}
            <div className="">
              <InputLabel
                text="Email Address"
                required={true}
              />
              <UserAuthInput
                onChange={(name, value) => handleChange("email", value)}
                type="email"
                value={billingFormData.email}
                placeholder="Enter Your Email"
                name="email"
                required="true"
                className="border-borderColor focus:border-theme !outline-0 !ring-0 focus:!ring-0 mt-1 lg:mt-2"
              />
              {inputErrors.email && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.email}
                </p>
              )}
            </div>
            {/* Address Switch */}
            {
              
            <div className="">
              <div>
                <InputLabel
                  text="Switch Address"
                  required={false}
                />
                <select
                  className="pt-[8px] pr-[20px] pb-[8px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                  onChange={handleAddressChange}
                  value={defaultAddress?.id || ""}
                >
                  <option value="">Select Address</option>
                  {customerDefaultAddress.map((item, index) => (
                    <option key={index} value={item.id}>
                      {`${item.city.name}, ${item.state.name}, ${item.country.name}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            }
            {/* Phone Number */}
            <div className="flex flex-col">
              <InputLabel
                text="Phone Number"
                required={true}
              />
              <div className="flex items-center relative mt-1 lg:mt-2 border-[1px] border-borderColor rounded-md text-text-sm md:text-sm lg:text-sm">
                <div className="" ref={dropdownRef}>
                  <button
                    className="w-[110px] flex items-center justify-between bg-secondary py-[2px] sm:py-[2px] md:py-[4px] lg:py-2 px-2 rounded-l-md shadow-sm border-r-[1px] border-borderColor"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                  >
                    <div className="flex items-center justify-between !w-[200px]">
                      <img
                        src={`https://flagcdn.com/w40/${
                          selectedFlag?.toLowerCase() || "us"
                        }.png`}
                        alt={`${selectedFlag} flag`}
                        className="w-6 h-4 mr-2 border-[1px] border-tertiary"
                        onError={(e) => {
                          e.target.src = `https://flagcdn.com/w40/us.png`;
                        }}
                      />
                      <p className="text-tertiary">{selectedCode}</p>
                      <p className="text-tertiary pl-1 text-xl duration-500 transition-all">
                        {isOpen ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </p>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md mt-1 rounded-md z-[6]">
                      <input
                        type="text"
                        placeholder="Search country"
                        className="w-full p-2 border-b border-gray-300 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="max-h-60 overflow-y-auto">
                        {phoneCodes
                          ?.filter(
                            (item) =>
                              item?.name
                                ?.toLowerCase()
                                .includes(search.toLowerCase()) ||
                              item?.phonecode?.includes(search)
                          )
                          .map((item) => (
                            <div
                              key={item?.iso2}
                              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleSelect(item?.phonecode, item?.iso2)
                              }
                            >
                              <img
                                src={`https://flagcdn.com/w40/${item?.iso2?.toLowerCase()}.png`}
                                alt={`${item?.name} flag`}
                                className="w-5 h-3"
                                onError={(e) => {
                                  e.target.src = `https://flagcdn.com/w40/us.png`;
                                }}
                              />
                              <span>{item?.name}</span>
                              <span className="ml-auto">{item?.phonecode}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <UserAuthInput
                  className="!border-none focus:border-theme !outline-0 !ring-0 focus:!ring-0 !rounded-l-none !text-left !pl-3 !py-[6px]"
                  onChange={(name, value) => handleChange("phoneNumber", value)}
                  value={billingFormData.phoneNumber}
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required={true}
                />
              </div>
              {inputErrors.phoneNumber && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.phoneNumber}
                </p>
              )}
            </div>

            {/* Country Selector */}
            <div>
              <InputLabel
                text="Country"
                required={true}
              />
              <select
                className="pt-[8px] pr-[20px] pb-[8px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={handleBillingCountryChange}
                value={billingFormData.country.name || ""}
              >
                <option value="">Select Country</option>
                {countries.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {inputErrors.country && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.country}
                </p>
              )}
            </div>
            {/* State Selector */}
            <div>
              <InputLabel
                text="State"
                required={true}
              />
              <select
                className="pt-[8px] pr-[20px] pb-[8px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={handleBillingStateChange}
                value={billingFormData.state.name || ""}
                disabled={!billingFormData.country.id}
              >
                <option value="">Select State</option>
                {billingStates.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              {inputErrors.state && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.state}
                </p>
              )}
            </div>
            {/* City Selector */}
            <div>
              <InputLabel
                text="City"
                required={true}
              />
              <select
                className="pt-[8px] pr-[20px] pb-[8px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={handleBillingCityChange}
                value={billingFormData.city.name || ""}
                disabled={!billingFormData.state.id}
              >
                <option value="">Select City</option>
                {billingCities.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {inputErrors?.city && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors?.city}
                </p>
              )}
            </div>
            {/* Shipping Zone Selector */}
            <div>
              <InputLabel
                text="Shipping Zone"
                required={true}
              />
              <select
                className="pt-[8px] pr-[20px] pb-[8px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-sm mt-1 lg:mt-2 w-full"
                onChange={(e) => {
                  const selectedZone = billingZones.find(
                    (zone) => zone.name === e.target.value
                  );
                  setSelectedShippingZone(e.target.value);
                  if (selectedZone) {
                    setBillingFormData((prev) => ({
                      ...prev,
                      shippingZone: selectedZone,
                    }));
                  }
                }}
                value={billingFormData.shippingZone?.name || ""}
                disabled={!billingFormData.city?.id || loading}
              >
                <option value="">Select Shipping Zone</option>
                {loading ? (
                  <option value="">Loading...</option>
                ) : (
                  billingZones.map((zone, index) => (
                    <option key={index} value={zone.name}>
                      {`${zone.name} (${currency_symbol}${(
                        zone.price / (parseFloat(conversion_rate_to_tk) || 1)
                      ).toFixed(2)})`}
                    </option>
                  ))
                )}
              </select>
              {inputErrors.shippingZone && (
                <p className="text-red-500 text-xs pt-[2px]">
                  {inputErrors.shippingZone}
                </p>
              )}
            </div>
          </div>
          <div className="pt-4">
            <InputLabel
              text="Address"
              required={true}
            />
            <textarea
              onChange={(e) => handleChange("billingAddress", e.target.value)}
              name="billingAddress"
              placeholder="Enter Your Address"
              rows="2"
              className="text-text-sm md:text-sm lg:text-sm w-full mt-1 lg:mt-2 rounded-md border-borderColor focus:!border-theme !ring-0 focus:!ring-0 focus:!outline-none"
              value={billingFormData.billingAddress}
            ></textarea>

            {inputErrors.billingAddress && (
              <p className="text-red-500 text-xs pt-[2px]">
                {inputErrors.billingAddress}
              </p>
            )}
          </div>
        </form>
      </div>
      {/* Ship To Another Address */}
    </div>
  );
};

export default CheckoutForm;
