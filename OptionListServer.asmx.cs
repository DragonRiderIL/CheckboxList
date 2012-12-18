namespace Itst.Jacks.Web.Plugins.CheckboxList
{
    using System.Web.Services;

    /// <summary>
    /// Summary description for OptionListServer
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class OptionListServer : System.Web.Services.WebService
    {
        /// <summary>
        /// Gets the list.
        /// </summary>
        [WebMethod]
        public object[] GetList()
        {
            var list = new object[]
            {
                new 
                {
                    GroupName = "First Group",
                    GroupId = "FirstGroup",
                    DisableGroup = false,
                    Items = new object[]
                        {
                            new
                            {
                            OptionName = "First Selection",
                            OptionId = "First",
                            Selected = false,
                            Enabled = true
                            }
                        }
                },
                new
                {
                    GroupName = "Second Group",
                    GroupId = "SecondGroup",
                    DisableGroup = false,
                    Items = new object[]
                    {
                        new 
                        {
                            OptionName = "First Selection",
                            OptionId = "First",
                            Selected = false,
                            Enabled = true
                            
                        },
                        new 
                        {
                            OptionName = "Second Selection",
                            OptionId = "Second",
                            Selected = true,
                            Enabled = true
                        },
                        new 
                        {
                            OptionName = "Third Selection",
                            OptionId = "Third",
                            Selected = true,
                            Enabled = false
                        }
                    }
                },
                new
                {
                    GroupName = "Third Group",
                    GroupId = "ThirdGroup",
                    DisableGroup = false,
                    Items = new object[]
                    {
                        new 
                        {
                            OptionName = "First Selection",
                            OptionId = "First",
                            Selected = false,
                            Enabled = true
                            
                        },
                        new 
                        {
                            OptionName = "Second Selection",
                            OptionId = "Second",
                            Selected = true,
                            Enabled = true
                        },
                        new 
                        {
                            OptionName = "Third Selection",
                            OptionId = "Third",
                            Selected = true,
                            Enabled = false
                        }
                    }
                },
                new
                {
                    GroupName = "Fourth Group",
                    GroupId = "FourthGroup",
                    DisableGroup = true,
                    Items = new object[]
                    {
                        new 
                        {
                            OptionName = "First Selection",
                            OptionId = "First",
                            Selected = false,
                            Enabled = true
                            
                        },
                        new 
                        {
                            OptionName = "Second Selection",
                            OptionId = "Second",
                            Selected = true,
                            Enabled = true
                        },
                        new 
                        {
                            OptionName = "Third Selection",
                            OptionId = "Third",
                            Selected = true,
                            Enabled = false
                        },
                        new 
                        {
                            OptionName = "Fourth Selection",
                            OptionId = "Fourth",
                            Selected = true,
                            Enabled = false
                        },
                        new 
                        {
                            OptionName = "Fifth Selection",
                            OptionId = "Fifth",
                            Selected = true,
                            Enabled = false
                        },
                        new 
                        {
                            OptionName = "Sixth Selection",
                            OptionId = "Sixth",
                            Selected = true,
                            Enabled = false
                        }
                    }
                },
                new
                {
                    GroupName = "",
                    GroupId = "FourthGroup",
                    DisableGroup = false,
                    Items = new object[]
                    {
                        new 
                        {
                            OptionName = "First Selection",
                            OptionId = "First",
                            Selected = false,
                            Enabled = true
                            
                        },
                        new 
                        {
                            OptionName = "Second Selection",
                            OptionId = "Second",
                            Selected = true,
                            Enabled = true
                        },
                        new 
                        {
                            OptionName = "Third Selection",
                            OptionId = "Third",
                            Selected = true,
                            Enabled = false
                        },
                        new 
                        {
                            OptionName = "Fourth Selection",
                            OptionId = "Fourth",
                            Selected = true,
                            Enabled = false
                        },
                        new 
                        {
                            OptionName = "Fifth Selection",
                            OptionId = "Fifth",
                            Selected = true,
                            Enabled = false
                        },
                        new 
                        {
                            OptionName = "Sixth Selection",
                            OptionId = "Sixth",
                            Selected = true,
                            Enabled = false
                        }
                    }
                }
            };

            return list;
        }
    }
}
